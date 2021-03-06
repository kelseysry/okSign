"""empty message

Revision ID: 66b1222ff4b0
Revises: 94272743cbe4
Create Date: 2021-12-15 21:57:55.885444

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '66b1222ff4b0'
down_revision = '94272743cbe4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('profiles', sa.Column('politic_id', sa.Integer(), nullable=True))
    op.add_column('profiles', sa.Column('religion_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'profiles', 'religions', ['religion_id'], ['id'])
    op.create_foreign_key(None, 'profiles', 'politics', ['politic_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'profiles', type_='foreignkey')
    op.drop_constraint(None, 'profiles', type_='foreignkey')
    op.drop_column('profiles', 'religion_id')
    op.drop_column('profiles', 'politic_id')
    # ### end Alembic commands ###
