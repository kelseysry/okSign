"""empty message

Revision ID: 397d13028ec9
Revises: 3bbd161a10c7
Create Date: 2021-12-12 21:00:46.111310

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '397d13028ec9'
down_revision = '3bbd161a10c7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('profiles', sa.Column('partner_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'profiles', 'partners', ['partner_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'profiles', type_='foreignkey')
    op.drop_column('profiles', 'partner_id')
    # ### end Alembic commands ###
