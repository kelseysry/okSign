"""empty message

Revision ID: aaf7a32271e7
Revises: 8e3e8a85c8ae
Create Date: 2021-12-12 20:39:53.021048

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'aaf7a32271e7'
down_revision = '8e3e8a85c8ae'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('profiles', sa.Column('relationship_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'profiles', 'relationships', ['relationship_id'], ['id'])
    op.add_column('relationships', sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('relationships', 'created_at')
    op.drop_constraint(None, 'profiles', type_='foreignkey')
    op.drop_column('profiles', 'relationship_id')
    # ### end Alembic commands ###
